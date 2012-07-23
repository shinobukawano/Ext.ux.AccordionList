/**
 *  {@link Ext.ux.AccordionList} is a subclass of {@link Ext.Container}
 *  Accordion list with using Ext.data.TreeStore.
 *  You can use expand and collapse contents by header item tap.
 *  And also it can nested infinity!
 *
 *  @author Shinobu Kawano <kawanoshinobu@github>
 */
Ext.define('Ext.ux.AccordionList', {
    alternateClassName: 'Ext.AccordionList',

    extend: 'Ext.Container',

    xtype: 'accordionlist',

    requires: [
        'Ext.data.Store',
        'Ext.dataview.DataView',
        'Ext.Anim',
        'Ext.XTemplate',
        'Ext.data.NodeStore',
        'Ext.data.TreeStore'
    ],

    config: {

        /**
         * @cfg {String} cls
         */
        cls: Ext.baseCSSPrefix + 'accordion-list',

        /**
         * @cfg {Object} layout
         */
        layout: {
            type: 'fit'
        },

        /**
         * @cfg {Ext.data.TreeStore} store
         */
        store: null,

        /**
         * @cfg {String} displayField
         */
        displayField: 'text',

        /**
         * @cfg {Boolean} scrollable
         */
        listScrollable: true,

        /**
         * @cfg {String} headerItemTpl
         */
        headerItemTpl: [
            '<div style="background-color:#fff;',
            ' min-height: 2.6em; padding: 0.4em 0.2em;',
            ' border-bottom: 1px solid #dedede;">',
                '<tpl if="this.isExpanded(values)">',
                  '<span class="x-button x-button-plain">',
                    '<span class="x-button-icon arrow_down x-icon-mask"',
                    ' style="margin-right:0.4em;"></span>',
                    '<span style="color:#00bbe8;">{text}</span>',
                  '</span>',
                '<tpl else>',
                  '<span class="x-button x-button-plain">',
                    '<span class="x-button-icon arrow_right x-icon-mask"',
                    ' style="margin-right:0.4em;"></span>',
                    '<span style="color:#00bbe8;">{text}</span>',
                  '</span>',
                '<tpl>',
            '</div>'
            // '<div style="background-color:#fff;',
            // ' min-height: 2.6em; padding: 0.65em 0.8em;',
            // ' border-bottom: 1px solid #dedede;',
            // ' color:#00bbe8;">',
            //     '{text}',
            // '</div>'
        ].join(''),

        /**
         * @cfg {String} contentItemTpl
         */
        contentItemTpl: [
            '<div style="background-color:#fff;',
            ' min-height: 2.6em; padding: 0.65em 0.8em;',
            ' border-bottom: 1px solid #dedede;">',
                '{text}',
            '</div>'
        ].join(''),

        /**
         * @cfg {Boolean} defaultExpanded
         */
        defaultExpanded: false,

        /**
         * @cfg {Boolean} defaultExpanded
         */
        useAnimation: true,

        // @private
        list: null
    },

    initialize: function() {
        this.doInitialize();
        this.callParent(arguments);
    },

    /**
     * @private
     */
    doInitialize: function() {
        if (this.getDefaultExpanded()) {
            this.doAllExpanded();
        }
    },

    /**
     * Display all of contents.
     */
    doAllExpanded: function() {
        var list = this.getList(),
            store = list.getStore();

        function doExpand(node) {
            node.expand();
            if (!node.isLeaf()) {
                node.childNodes.forEach(doExpand, this);
            }
        }
        store.each(doExpand, this);
    },

    /**
     * @private
     */
    updateStore: function(newStore, oldStore) {
        var list = this.getList(),
            itemTpl;

        if (!list) {
            itemTpl = new Ext.XTemplate(
                '<tpl if="leaf">',
                    '<div class="accordion-list-content">',
                        this.getContentItemTpl(),
                    '</div>',
                '<tpl else>',
                    // '<tpl if="this.isExpanded(values)">',
                    //     'hoge',
                    // '<tpl>',
                    '<div class="accordion-list-header">',
                        this.getHeaderItemTpl(),
                    '</div>',
                '</tpl>',
                {
                    isExpanded: function(values) {
                        return values.expanded;
                    }
                });

            list = Ext.create('Ext.dataview.DataView', {
                itemTpl: itemTpl
            });

            list.on('itemtap', this.onItemTap, this);

            this.setList(list);
            list.setScrollable(this.getListScrollable());
            this.add(list);
        }

        list.setStore(newStore);
    },

     /**
     * @private
     */
     updateListScrollable: function(newListScrollable, oldListScrollable) {
          var list = this.getList();
          if (list) {
              list.setScrollable(newListScrollable);
          }
     },

    /**
     * Called when an list item has been tapped
     * @param {Ext.List} list The subList the item is on
     * @param {Number} index The id of the item tapped
     * @param {Ext.Element} target The list item tapped
     * @param {Ext.data.Record} record The record whichw as tapped
     * @param {Ext.event.Event} e The event
     */
    onItemTap: function(list, index, target, record, e) {
        var store = list.getStore(),
            node = store.getAt(index);

        this.fireEvent('itemtap',
            this, list, index, target, record, e);

        if (node.isLeaf()) {
            this.fireEvent('leafitemtap',
                list, index, target, record, e);

        } else {
            if (node.isExpanded()) {
                node.collapse();
            } else {
                node.expand(false, this.onExpand, this);
            }
        }
    },

    /**
     * @event onExpand
     * Fires when a node is tapped on
     */
    onExpand: function() {
        if (!this.getUseAnimation()) {
            return;
        }

        var targets = this.getTargetItems();

        for (var i = 0; i < targets.length; i++) {
            Ext.Anim.run(Ext.get(targets[i]), 'fade', {
                duration: i === 0 ? 150 : i * 300
            });
        }
    },

    /**
     * @private
     */
    getTargetItems: function() {
        var header = Ext.query('.' + this.getCls() + ' .x-dataview-item'),
            isTarget = false,
            targets = [],
            elem;

        for (var i = 0; i < header.length; i++) {
            elem = Ext.get(header[i]);

            if (elem.hasCls('x-item-selected')) {
                isTarget = true;
                continue;
            }

            if (isTarget) {
                var content = elem.down('.accordion-list-content');
                if (content) {
                    targets.push(content);
                } else {
                    break;
                }
            }
        }

        return targets;
    }

});
