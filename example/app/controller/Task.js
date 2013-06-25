Ext.define('AccordionListExample.controller.Task', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
        },
        control: {
            'accordionlist': {
                itemtap: 'onItemTap',
                leafitemtap: 'onLeafItemTap'
            }
        }
    },

    onItemTap: function(self, list, index, target, record) {
        // console.log(record.get('text'));
    },

    onLeafItemTap: function(list, index, target, record) {
        var value = record.get('text') || '';
        Ext.Msg.alert('You tapped leaf! : ' + value);
    }
});
