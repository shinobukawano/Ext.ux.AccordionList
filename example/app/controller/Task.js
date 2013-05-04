Ext.define('AccordionListExample.controller.Task', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
        },
        control: {
            'accordionlist': {
                leafitemtap: 'onLeafItemTap'
            }
        }
    },

    onLeafItemTap: function(list, index, target, record) {
        var value = record.get('text') || '';
        Ext.Msg.alert('You tapped leaf! : ' + value);
    }
});
