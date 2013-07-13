/**
 * @class AccordionListExample.view.ContentListItem
 * @extends Ext.dataview.component.ListItem
 */
Ext.define('AccordionListExample.view.ContentListItem', {
    extend: 'Ext.dataview.component.ListItem',
    xtype: 'contentlistitem',
    config: {
        dataMap: {
            getText: {
                setHtml: 'text'
            },
            getButton: {
                setButtonType: 'button'
            }
        },
        text: {
            cls: 'text'
        },
        button: {},
        layout: {
            type: 'vbox'
        }
    },

    applyText: function(config) {
        return Ext.factory(config, Ext.Component);
    },

    updateText: function(newName) {
        if (newName) {
            this.add(newName);
        }
    },

    applyButton: function(config) {
        return Ext.factory(config, Ext.Button);
    },

    updateButton: function(newButton) {
        if (newButton) {
            this.add(newButton);
        }
    }
});
