'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';


const AnalyticsContext = createContext(undefined);


const VISITOR_KEY = 'arcana_visitor_id';
const SESSION_KEY = 'arcana_session_id';
const CAMPAIGN_KEY = 'arcana_campaign';


const createUUID = () => crypto.randomUUID();


const getOrCreateId = (storage, key) => {
    let id = storage.getItem(key);

    if (!id) {
        id = createUUID();
        storage.setItem(key, id);
    }

    return id;
};


const getCampaignData = () => {
    const params = new URLSearchParams(window.location.search);

    const campaign = {
        utm_source: params.get('utm_source'),
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign'),
        utm_content: params.get('utm_content'),
        utm_term: params.get('utm_term'),
    };

    return Object.fromEntries(
        Object.entries(campaign).filter(([, value]) => value)
    );
};


export const AnalyticsProvider = ({ children, profileId }) => {

    const pathname = usePathname();

    const visitorId = useRef(null);
    const sessionId = useRef(null);
    const campaign = useRef({});

    const lastPageTracked = useRef(null);

    const [ready, setReady] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | Inicializar visitante y sesión
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        visitorId.current = getOrCreateId(
            localStorage,
            VISITOR_KEY
        );

        sessionId.current = getOrCreateId(
            sessionStorage,
            SESSION_KEY
        );


        /*
        |--------------------------------------------------------------------------
        | Guardar campaña UTM durante la sesión
        |--------------------------------------------------------------------------
        */

        const currentCampaign = getCampaignData();

        if (Object.keys(currentCampaign).length > 0) {

            campaign.current = currentCampaign;

            sessionStorage.setItem(
                CAMPAIGN_KEY,
                JSON.stringify(currentCampaign)
            );

        } else {

            try {

                campaign.current = JSON.parse(
                    sessionStorage.getItem(CAMPAIGN_KEY)
                ) || {};

            } catch {

                campaign.current = {};

            }

        }

        setReady(true);

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Registrar evento genérico
    |--------------------------------------------------------------------------
    */

    const trackEvent = useCallback(async (eventName, options = {}) => {

        if (
            !ready ||
            !profileId ||
            !visitorId.current ||
            !sessionId.current
        ) {
            return false;
        }


        const {
            productId = null,
            value = null,
            searchQuery = null,
            metadata = {},
        } = options;


        const payload = {

            user_id: profileId,

            visitor_id: visitorId.current,

            session_id: sessionId.current,

            event_name: eventName,

            path: pathname || window.location.pathname,

            referrer: document.referrer || null,

            product_id: productId,

            value,

            search_query: searchQuery,

            metadata: {
                ...campaign.current,

                timezone:
                    Intl.DateTimeFormat()
                        .resolvedOptions()
                        .timeZone,

                screen_width:
                    window.screen.width,

                screen_height:
                    window.screen.height,

                ...metadata,
            },

        };


        try {

            const response = await fetch(
                '/api/analytics/event',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(payload),

                    keepalive: true,
                }
            );


            if (!response.ok) {

                if (process.env.NODE_ENV === 'development') {
                    console.error(
                        'Error registrando evento:',
                        await response.text()
                    );
                }

                return false;

            }


            return true;


        } catch (error) {

            /*
            |--------------------------------------------------------------------------
            | Analytics nunca debe romper la experiencia de compra
            |--------------------------------------------------------------------------
            */

            if (process.env.NODE_ENV === 'development') {
                console.error('Analytics error:', error);
            }

            return false;

        }

    }, [
        ready,
        profileId,
        pathname,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Page View automático
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!ready || !profileId || !pathname) {
            return;
        }


        const pageKey = `${profileId}:${pathname}`;


        if (lastPageTracked.current === pageKey) {
            return;
        }


        lastPageTracked.current = pageKey;


        trackEvent('page_view', {
            metadata: {
                title: document.title,
            },
        });


    }, [
        ready,
        profileId,
        pathname,
        trackEvent,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Helpers comerciales
    |--------------------------------------------------------------------------
    */


    const trackProductView = useCallback((product) => {

        return trackEvent('product_view', {

            productId: product.id,

            value: Number(product.price),

            metadata: {
                title: product.title,
            },

        });

    }, [trackEvent]);


    const trackAddToCart = useCallback((
        product,
        amount = 1
    ) => {

        return trackEvent('add_to_cart', {

            productId: product.id,

            value: Number(product.price) * amount,

            metadata: {
                title: product.title,
                price: Number(product.price),
                amount,
            },

        });

    }, [trackEvent]);


    const trackRemoveFromCart = useCallback((product) => {

        return trackEvent('remove_from_cart', {

            productId: product.id,

            value: Number(product.price),

            metadata: {
                title: product.title,
            },

        });

    }, [trackEvent]);


    const trackSearch = useCallback((
        query,
        results = 0
    ) => {

        return trackEvent('search', {

            searchQuery: query,

            metadata: {
                results,
            },

        });

    }, [trackEvent]);


    const trackOpenCart = useCallback((
        total,
        totalItems
    ) => {

        return trackEvent('open_cart', {

            value: Number(total),

            metadata: {
                total_items: totalItems,
            },

        });

    }, [trackEvent]);


    const trackCheckout = useCallback((
        cart,
        total
    ) => {

        return trackEvent('whatsapp_checkout', {

            value: Number(total),

            metadata: {

                total_items: cart.reduce(
                    (sum, item) => sum + item.amount,
                    0
                ),

                products: cart.map((item) => ({
                    id: item.id,
                    title: item.title,
                    amount: item.amount,
                    price: Number(item.price),
                })),

            },

        });

    }, [trackEvent]);


    /*
    |--------------------------------------------------------------------------
    | Context Value
    |--------------------------------------------------------------------------
    */

    const contextValue = useMemo(() => ({

        ready,

        visitorId: visitorId.current,

        sessionId: sessionId.current,

        trackEvent,

        trackProductView,

        trackAddToCart,

        trackRemoveFromCart,

        trackSearch,

        trackOpenCart,

        trackCheckout,

    }), [
        ready,
        trackEvent,
        trackProductView,
        trackAddToCart,
        trackRemoveFromCart,
        trackSearch,
        trackOpenCart,
        trackCheckout,
    ]);


    return (
        <AnalyticsContext.Provider value={contextValue}>
            {children}
        </AnalyticsContext.Provider>
    );

};


export const useAnalytics = () => {

    const context = useContext(AnalyticsContext);

    if (!context) {
        throw new Error(
            'useAnalytics debe utilizarse dentro de AnalyticsProvider'
        );
    }

    return context;

};