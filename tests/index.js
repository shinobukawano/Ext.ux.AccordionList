var Harness = Siesta.Harness.Browser.SenchaTouch;

Harness.configure({
    title     : 'Ext.ux.AccordionList Test',

    preload : [
        "http://cdn.sencha.com/touch/sencha-touch-2.3.1/resources/css/sencha-touch.css",
        "http://cdn.sencha.com/touch/sencha-touch-2.3.1/sencha-touch-all-debug.js"
    ],

    keepNLastResults    : 2
});

Harness.start(
    {
        group           : 'Ext.ux.AccordionList tests',
        hostPageUrl     : '../examples/',
        performSetup    : true,
        items           : [
            'spec/010_basic.t.js',
            'spec/020_decorate.t.js',
            'spec/030_nested.t.js',
            'spec/040_paging.t.js',
            'spec/050_components.t.js',
            'spec/060_grouped.t.js'
        ]
    }
);
