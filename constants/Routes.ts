const ROUTES = {
    DASHBOARD: '/(tabs)',
    HISTORY: '/(tabs)/history',
    SETTINGS: '/(tabs)/settings',
    VIP: '/(tabs)/vip',
    ABOUT: '/about',
    SIGN_IN: '/sign-in',
    PREP: '/prep',
    PREP_2: '/prep/second',
    PREP_3: '/prep/third',
    PREP_FINAL: '/prep/final',
    RESULTS: '/results',
    RESULTS_2: '/results/second',
    RESULTS_3: '/results/third',
    RESULTS_4: '/results/fourth',
    RESULTS_FINAL: '/results/final',
    ONBOARDING: '/onboarding',
    ONBOARDING_2: '/onboarding/second',
    NOTIFICATIONS: '/modals/notifications',
    PAST_APPOINTMENT: '/modals/past',
    API_COMPLETION: '/api/completion',
} as const;

export default ROUTES;
