Ext.define('AccordionListExample.store.PL', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'AccordionListExample.model.PL'
    ],

    config: {
        defaultRootProperty: 'items',
        model: 'AccordionListExample.model.PL',

        // XXX: AccordionList Now show data from JSON
        proxy: {
            type: 'ajax',
            url: 'resources/data/plData.json'
        }
    }
});
