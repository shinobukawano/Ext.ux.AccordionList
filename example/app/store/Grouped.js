Ext.define('AccordionListExample.store.Grouped', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'AccordionListExample.model.Task'
    ],

    config: {
        defaultRootProperty: 'items',
        model: 'AccordionListExample.model.Task',

        grouper: {
            groupFn: function(item) {
                return item.get('text')[0];
            },
        },

        folderSort: true,

        proxy: {
            type: 'ajax',
            url: 'resources/data/groupedData.json'
        }
    },

    //@Override
    updateFolderSort: function(folderSort) {
        return;
    }

});
