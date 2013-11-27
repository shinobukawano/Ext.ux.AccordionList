Ext.define('AccordionListExample.store.Components', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'AccordionListExample.model.Components'
    ],

    config: {
        defaultRootProperty: 'items',
        model: 'AccordionListExample.model.Components',

        // XXX: AccordionList Now show data from JSON
        proxy: {
            type: 'ajax',
            url: 'resources/data/componentsData.json'
        }
    }

});
