/**
 * @class AccordionListExample.controller.Main
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('AccordionListExample.controller.Main', {
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
       Ext.Msg.alert('You tapped leaf! : ' + record.get('text'));
    }
});