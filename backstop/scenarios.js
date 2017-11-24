const DOMAIN = 'localhost:8000';

const composeScenario = (...args) => Object.assign({}, ...args);
const contentOnly = composeScenario.bind(null, {
    selectors: ['.content-wrapper'],
});

const generateScenario = (scenario, i) => {
    let label = `${scenario.path} ${i}`;

    if (scenario.typeSelector) {
        if (Array.isArray(scenario.typeSelector)) {
            label += ` ${scenario.typeSelector.join(', ')}`;
        } else {
            label += ` ${scenario.typeSelector}`;
        }
    }

    if (scenario.clickSelector) {
        if (Array.isArray(scenario.clickSelector)) {
            label += ` ${scenario.clickSelector.join(', ')}`;
        } else {
            label += ` ${scenario.clickSelector}`;
        }
    }

    label = label.substring(0, 50);

    return Object.assign(
        {
            label,
            url: `http://${DOMAIN}/admin${scenario.path}`,
            misMatchThreshold: 0.01,
            hideSelectors: [
                // Relative dates are dynamic, thus likely to break tests.
                // '.human-readable-date'
            ],
            onBeforeScript: 'onBefore.js',
            onReadyScript: 'onReady.js',
            cookies: {
                sessionid: process.env.WAGTAIL_SESSIONID,
            },
        },
        scenario,
    );
};

const PAGE_ID = 60;

const base = [
    { path: '/login', onBeforeScript: null },
    // No way to disable JavaScript with Chromy at the moment.
    // { path: '/', label: 'No JS', onBeforeScript: 'disableJS.js' },
    { path: '/', selectors: ['.nav-wrapper', '.content-wrapper'] },
    { path: '/404' },
    contentOnly({ path: '/styleguide/' }),
    // Revokes the session cookie, which is annoying when testing.
    // { path: '/logout' },
    // Loading spinner always makes the test fail.
    // { path: '/pages/preview' },
];

const nav = [
    {
        path: '/',
        selectors: ['.nav-wrapper'],
        clickSelector: '#account-settings',
    },
    {
        path: '/',
        clickSelector: '.submenu-trigger.icon-cogs',
    },
    {
        path: '/',
        clickSelector: '.submenu-trigger.icon-fa-cutlery',
    },
    {
        path: '/',
        clickSelector: '[data-explorer-menu-item] > a',
    },
    {
        path: '/',
        clickSelector: [
            '[data-explorer-menu-item] > a',
            '.c-explorer__item__action:last-of-type',
        ],
    },
];

const pages = [
    contentOnly({ path: '/pages/' }),
    contentOnly({ path: '/pages/search/?q=bread' }),
    contentOnly({ path: '/pages/search/?q=test123456' }),
    contentOnly({
        path: `/pages/${PAGE_ID}/`,
        clickSelector: '.index [data-dropdown]',
    }),
    contentOnly({
        path: `/pages/${PAGE_ID}/`,
        // TODO Privacy type select not working.
        clickSelector: ['.action-set-privacy', '[for="id_restriction_type_2"]'],
    }),
    contentOnly({ path: `/pages/${PAGE_ID}/?ordering=ord` }),
    contentOnly({ path: `/pages/${PAGE_ID}/edit/` }),
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        clickSelector: '.action-set-privacy',
    }),
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        clickSelector: '#id_image-chooser li:nth-child(2) button',
    }),
    // TODO Does not seem to work for the second selector?
    // contentOnly({
    //     path: `/pages/${PAGE_ID}/edit/`,
    //     clickSelector: [
    //         '#id_image-chooser li:nth-child(2) button',
    //         '[href="#upload"]',
    //     ],
    // }),
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        clickSelector: '#id_hero_cta_link-chooser li:nth-child(2) button',
    }),
    // Does not seem to work for the second selector?
    // contentOnly({
    //     path: `/pages/${PAGE_ID}/edit/`,
    //     clickSelector: [
    //         '#id_hero_cta_link-chooser li:nth-child(2) button',
    //         '[href="/admin/choose-page/3/?page_type=wagtailcore.page"]',
    //     ],
    // }),
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        clickSelector: ['.action-clear', '.dropdown-toggle'],
    }),
    contentOnly({ path: `/pages/${PAGE_ID}/revisions/` }),
    contentOnly({ path: `/pages/${PAGE_ID}/unpublish/` }),
    contentOnly({ path: `/pages/${PAGE_ID}/delete/` }),
    contentOnly({ path: `/pages/${PAGE_ID}/copy/` }),
    contentOnly({ path: `/pages/${PAGE_ID}/add_subpage/` }),
    contentOnly({ path: `/pages/add/base/homepage/60/` }),
    contentOnly({
        path: `/pages/add/base/homepage/60/`,
        clickSelector: '[href="#tab-promote"]',
    }),
    contentOnly({
        path: `/pages/add/base/homepage/60/`,
        clickSelector: ['[href="#tab-settings"]', '[for="id_go_live_at"]'],
    }),
    contentOnly({ path: `/pages/69/move/60/` }),
    // TODO Test lock
];

const richtext = [
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        typeSelector: '[for="id_promo_text"] + div .richtext',
        clickSelector: '[title="h2"]',
    }),
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        typeSelector: '[for="id_promo_text"] + div .richtext',
        clickSelector: '[title="OL"]',
    }),
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        typeSelector: '[for="id_promo_text"] + div .richtext',
        clickSelector: '[title="UL"]',
    }),
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        typeSelector: '[for="id_promo_text"] + div .richtext',
        clickSelector: '[title="Horizontal rule"]',
    }),
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        typeSelector: '[for="id_promo_text"] + div .richtext',
        clickSelector: ['[title="Horizontal rule"]', '[title="Undo"]'],
    }),
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        typeSelector: '[for="id_promo_text"] + div .richtext',
        clickSelector: '[title="Embed"]',
    }),
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        typeSelector: '[for="id_promo_text"] + div .richtext',
        clickSelector: '[title="Documents"]',
    }),
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        typeSelector: '[for="id_promo_text"] + div .richtext',
        clickSelector: '[title="Images"]',
    }),
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        typeSelector: '[for="id_promo_text"] + div .richtext',
        clickSelector: '[title="Add/Edit Link"]',
    }),
    // TODO Investigate.
    // contentOnly({
    //     path: `/pages/${PAGE_ID}/edit/`,
    //     typeSelector: '[for="id_promo_text"] + div .richtext',
    //     clickSelector: [
    //         '[title="Add/Edit Link"]',
    //         '[href*="/admin/choose-external-link/"]',
    //     ],
    // }),
    // contentOnly({
    //     path: `/pages/${PAGE_ID}/edit/`,
    //     typeSelector: '[for="id_promo_text"] + div .richtext',
    //     clickSelector: [
    //         '[title="Add/Edit Link"]',
    //         '[href*="/admin/choose-email-link/"]',
    //     ],
    // }),
];

const streamfield = [
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        clickSelector: [
            '#body-0-appendmenu .toggle',
            '#body-0-appendmenu .action-add-block-heading_block',
            '#body-0-appendmenu .toggle',
            '#body-0-appendmenu .action-add-block-image_block',
            '#body-0-appendmenu .toggle',
            '#body-0-appendmenu .action-add-block-block_quote',
            '#body-0-appendmenu .toggle',
            '#body-0-appendmenu .action-add-block-embed_block',
        ],
    }),
    contentOnly({
        path: `/pages/${PAGE_ID}/edit/`,
        clickSelector: [
            '#body-0-appendmenu .toggle',
            '#body-0-appendmenu .action-add-block-heading_block',
            '#body-0-appendmenu .toggle',
            '#body-0-appendmenu .action-add-block-image_block',
            '#body-0-movedown',
            // TODO Investigate.
            // '#body-9-delete',
        ],
    }),
];

const modeladmin = [
    contentOnly({ path: '/base/people/' }),
    contentOnly({ path: '/base/people/edit/1/' }),
    contentOnly({ path: '/base/people/delete/1/' }),
    contentOnly({ path: '/base/people/create/' }),
];

const images = [
    contentOnly({ path: '/images/' }),
    contentOnly({ path: '/images/?q=bread' }),
    contentOnly({ path: '/images/?collection_id=2' }),
    contentOnly({ path: '/images/47/' }),
    contentOnly({ path: '/images/47/delete/' }),
    contentOnly({ path: '/images/add/' }),
];

const documents = [
    contentOnly({ path: '/documents/' }),
    contentOnly({ path: '/documents/?collection_id=2' }),
    // TODO Missing existing document edit / delete views.
    contentOnly({ path: '/documents/multiple/add/' }),
];

const snippets = [
    contentOnly({ path: '/snippets/' }),
    contentOnly({ path: '/snippets/base/people/' }),
    contentOnly({ path: '/snippets/base/people/1/' }),
    contentOnly({ path: '/snippets/base/people/1/delete/' }),
    contentOnly({ path: '/snippets/base/people/add/' }),
];

const forms = [
    contentOnly({ path: '/forms/' }),
    contentOnly({ path: '/forms/submissions/69/' }),
    contentOnly({
        path: '/forms/submissions/69/',
        clickSelector: '[for="id_date_to"]',
    }),
    contentOnly({
        path:
            '/forms/submissions/69/?date_from=2017-01-01&date_to=2050-01-01&action=filter',
        clickSelector: [
            '[for="id_date_to"]',
            '[data-date="9"][data-month="0"][data-year="2050"]',
        ],
    }),
    contentOnly({
        path: '/forms/submissions/69/',
        clickSelector: '[name="selected-submissions"]',
    }),
];

const settings = [
    contentOnly({ path: '/users/' }),
    contentOnly({ path: '/users/3/' }),
    contentOnly({ path: '/users/add/' }),
    contentOnly({
        path: '/users/add/',
        clickSelector: ['[href*="roles"]', '[for="id_groups_1"]'],
    }),
    contentOnly({
        path: '/users/?q=admin',
    }),
    contentOnly({ path: '/groups/' }),
    contentOnly({ path: '/groups/?q=edi' }),
    contentOnly({ path: '/groups/1/' }),
    contentOnly({
        path: '/groups/1/',
        clickSelector: [
            '#id_page_permissions-ADD',
            '#id_document_permissions-ADD',
            '#id_image_permissions-ADD',
        ],
    }),
    contentOnly({
        path: '/groups/1/',
        clickSelector: [
            '#id_page_permissions-0-DELETE-button',
            '#id_document_permissions-0-DELETE-button',
            '#id_image_permissions-0-DELETE-button',
        ],
    }),
    contentOnly({ path: '/groups/1/delete/' }),
    contentOnly({ path: '/groups/new/' }),
    contentOnly({ path: '/sites/' }),
    contentOnly({ path: '/sites/2/' }),
    contentOnly({ path: '/sites/2/delete/' }),
    contentOnly({ path: '/sites/new/' }),
    contentOnly({ path: '/collections/' }),
    contentOnly({ path: '/collections/2/' }),
    contentOnly({
        path: '/collections/2/',
        // TODO Privacy type click not working
        clickSelector: ['.action-set-privacy', '[for="id_restriction_type_3"]'],
    }),
    contentOnly({ path: '/collections/2/delete/' }),
    contentOnly({ path: '/collections/add/' }),
    contentOnly({ path: '/redirects/' }),
    contentOnly({ path: '/redirects/?q=test' }),
    // TODO Missing existing redirect edit / delete views.
    contentOnly({ path: '/redirects/add/' }),
    contentOnly({ path: '/searchpicks/' }),
    contentOnly({ path: '/searchpicks/?q=test' }),
    // TODO Missing existing searchpick edit / delete views.
    contentOnly({ path: '/searchpicks/add/' }),
    contentOnly({
        path: '/searchpicks/add/',
        clickSelector: '#id_query_string-chooser',
    }),
];

const account = [
    contentOnly({ path: '/account/' }),
    contentOnly({ path: '/account/change_password/' }),
    contentOnly({ path: '/account/notification_preferences/' }),
    contentOnly({ path: '/account/language_preferences/' }),
    { path: '/password_reset/' },
];

const scenarios = [
    ...base,
    ...nav,
    ...pages,
    ...richtext,
    ...streamfield,
    ...modeladmin,
    ...images,
    ...documents,
    ...snippets,
    ...forms,
    ...settings,
    ...account,
];

module.exports = scenarios.map(generateScenario);
