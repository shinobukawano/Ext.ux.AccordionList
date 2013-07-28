Ext.define('AccordionListExample.view.ListItem', {
    extend: 'Ext.ux.AccordionListItem',
    xtype : 'examplelistitem',

    requires: [
        'Ext.field.DatePicker',
        'Ext.field.TextArea'
    ],

    config: {
        layout: {
            type: 'vbox'
        },

        text: {
        },
        button: {
            iconMask: true,
            docked: 'right',
            ui: 'plain'
        },
        message: {
            docked: 'bottom',
            label: 'message'
        },
        limit: {
            docked: 'top',
            label: 'limit'
        },

        headerDataMap: {
            getText: {
                setHtml: 'text'
            },
            getButton: {
                setIconCls: 'icon'
            }
        },
        contentDataMap: {
            getLimit: {
                setValue: 'limit'
            },
            getMessage: {
                setValue: 'message'
            }
        }
    },

    initialize: function () {
        var me = this;
        me.on({
            delegate: 'button',
            tap: function (btn, e) {
                e.stopPropagation();
                Ext.Msg.alert('You taped button!', me.getRecord().get('text'));
            }
        });
    },

    /**
     * @param  {Object} config
     */
    applyText: function(config) {
        return Ext.factory(config, Ext.Component);
    },

    /**
     * @param  {Ext.Component} newText
     */
    updateText: function(newText) {
        if (newText) {
            this.add(newText);
        }
    },

    /**
     * @param  {Object} config
     */
    applyButton: function(config) {
        return Ext.factory(config, Ext.Button);
    },

    /**
     * @param  {Ext.Component} newButton
     */
    updateButton: function(newButton) {
        if (newButton) {
            this.add(newButton);
        }
    },

    /**
     * @param  {Object} config
     */
    applyLimit: function(config) {
        return Ext.factory(config, Ext.field.DatePicker);
    },

    /**
     * @param  {Ext.Component} newDay
     */
    updateLimit: function(newDay) {
        if (newDay) {
            this.add(newDay);
        }
    },

     /**
     * @param  {Object} config
     */
    applyMessage: function(config) {
        return Ext.factory(config, Ext.field.TextArea);
    },

    /**
     * @param  {Ext.Component} newMessage
     */
    updateMessage: function(newMessage) {
        if (newMessage) {
            this.add(newMessage);
        }
    }

});
