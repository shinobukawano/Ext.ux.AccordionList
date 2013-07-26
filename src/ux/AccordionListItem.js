/**
 * A AccordionListItem is a container for Ext.ux.AccordionList with
 * useSimpleItems: false.
 *
 * ListItem configures and updates the {@link Ext.data.Model records} for
 * the sub-component items in a list.
 *
 * Overwrite the `updateRecord()` method to set a sub-component's value.
 * Sencha Touch calls `updateRecord()` whenever the data in the list updates.
 *
 * The `updatedata` event fires after `updateRecord()` runs.
 *
 * *Note*: Use of ListItem increases overhead since it generates more markup than
 * using the List class with useSimpleItems: true. This overhead is more
 * noticeable in Internet Explorer. If at all possible, use
 * {@link Ext.dataview.component.SimpleListItem} instead.
 *
 * The following example shows how to configure and update sub-component items
 * in a list:
 *
 *     Ext.define('Twitter.view.TweetListItem', {
 *         extend: 'Ext.dataview.component.ListItem',
 *         xtype : 'tweetlistitem',
 *         requires: [
 *             'Ext.Img'
 *         ],
 *         config: {
 *             userName: {
 *                 cls: 'username'
 *             },
 *             text: {
 *                 cls: 'text'
 *             },
 *             avatar: {
 *                 docked: 'left',
 *                 xtype : 'image',
 *                 cls   : 'avatar',
 *                 width: '48px',
 *                 height: '48px'
 *             },
 *             layout: {
 *                 type: 'vbox'
 *             }
 *         },
 *
 *         applyUserName: function(config) {
 *             return Ext.factory(config, Ext.Component, this.getUserName());
 *         },
 *
 *         updateUserName: function(newUserName) {
 *             if (newUserName) {
 *                 this.insert(0, newUserName);
 *             }
 *         },
 *
 *         applyText: function(config) {
 *             return Ext.factory(config, Twitter.view.TweetListItemText, this.getText());
 *         },
 *
 *         updateText: function(newText) {
 *             if (newText) {
 *                 this.add(newText);
 *             }
 *         },
 *
 *         applyAvatar: function(config) {
 *             return Ext.factory(config, Ext.Img, this.getAvatar());
 *         },
 *
 *         updateAvatar: function(newAvatar) {
 *             if (newAvatar) {
 *                 this.add(newAvatar);
 *             }
 *         },
 *
 *         updateRecord: function(record) {
 *             if (!record) {
 *                 return;
 *             }
 *
 *             this.getUserName().setHtml(record.get('username'));
 *             this.getText().setHtml(record.get('text'));
 *             this.getAvatar().setSrc(record.get('avatar_url'));
 *             this.callParent(arguments);
 *
 *         }
 *     });
 *
 */
Ext.define('Ext.ux.AccordionListItem', {
    extend: 'Ext.dataview.component.ListItem',
    xtype : 'accordionlistitem',

    config: {
        baseCls: Ext.baseCSSPrefix + 'accordion-list-item',
        text: '',
        dataMap: {
            getText: {
                setHtml: 'text'
            }
        }
    },

    /**
     * @param  {Object} config
     */
    applyText: function(config) {
        return Ext.factory(config, Ext.Component);
    },

    /**
     * @param  {Ext.Component} newName
     */
    updateText: function(newText) {
        if (newText) {
            this.add(newText);
        }
    }

});
