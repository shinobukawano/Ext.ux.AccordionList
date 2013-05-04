Ext.define('AccordionListExample.store.Task', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'AccordionListExample.model.Task'
    ],

    config: {
        defaultRootProperty: 'items',
        model: 'AccordionListExample.model.Task',
        autoLoad: true,

        // XXX: AccordionList Now show data from JSON
        proxy: {
            type: 'ajax',
            url: 'resources/data/testData.json'
        },

        listeners: {
            load: function(store, records, successful, operation, eOpts) {
                console.log(records.length);
                console.log(store.getCount());
            }
        }
    },

    onProxyLoad: function(operation) {
        var me = this,
            records = operation.getRecords(),
            successful = operation.wasSuccessful(),
            node = operation.getNode();

        node.beginEdit();
        node.set('loading', false);
        if (successful) {
            records = me.fillNode(node, records);
        }
        node.endEdit();
        this.updateNode(node);
        me.loading = false;
        me.loaded = true;

        node.fireEvent('load', node, records, successful);
        me.fireEvent('load', this, records, successful, operation);

        // this is a callback that would have been passed to the 'read' function and is
        // optional
        Ext.callback(operation.getCallback(), operation.getScope() || me, [records, operation, successful]);
    },

    onNodeBeforeExpand: function(node, options, e) {

    }

});
