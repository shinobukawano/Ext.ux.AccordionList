Ext.define('AccordionListExample.controller.Task', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
        },
        control: {
            'accordionlist[itemId=basic]': {
                leafitemtap: 'onLeafItemTap'
            },
            'accordionlist[itemId=decorate]': {
                leafitemtap: 'onLeafItemTap'
            },
             'accordionlist[itemId=nested]': {
                leafitemtap: 'onLeafItemTap'
            },
            'accordionlist[itemId=paging]': {
                leafitemtap: 'onLeafItemTap'
            },
            'accordionlist[itemId=grouped]': {
                leafitemtap: 'onLeafItemTap'
            }
        }
    },

    onLeafItemTap: function(list, index, target, record) {
        var value = record.get('text') || '';
        Ext.Msg.alert('You tapped leaf! : ' + value);
    }
});
