Ext.define('AccordionListExample.store.Task', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'AccordionListExample.model.Task'
    ],

    config: {
        defaultRootProperty: 'items',
        model: 'AccordionListExample.model.Task',

        // XXX: AccordionList Now show data from JSON
        proxy: {
            type: 'ajax',
            url: 'resources/data/testData.json'
        }
    }

});
