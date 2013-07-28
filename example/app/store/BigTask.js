Ext.define('AccordionListExample.store.BigTask', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'AccordionListExample.model.Task',
        'Ext.data.proxy.JsonP'
    ],

    config: {
        defaultRootProperty: 'items',
        model: 'AccordionListExample.model.Task',

        proxy: {
            type: 'jsonp',
            url: 'http://kawanoshinobu-api.herokuapp.com/task',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        }
    }

});
