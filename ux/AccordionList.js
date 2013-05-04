/**
 *  {@link Ext.ux.AccordionList} is a subclass of {@link Ext.Container}
 *  Collapsible List with using Ext.data.TreeStore.
 *  You can expand and collapse contents by header item tap.
 *  Also it can nested infinity.
 *
 *  @author KAWANO Shinobu <http://kawanoshinobu.com>
 */
Ext.define('Ext.ux.AccordionList', {
    extend: 'Ext.Container',
    xtype: 'accordionlist',
    alternateClassName: 'Ext.AccordionList',

    requires: [
        'Ext.dataview.List'
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
            '<tpl if="this.isExpanded(values)">',
                '{0}',
            '<tpl else>',
                '{1}',
            '</tpl>'
        ].join(''),

        /**
         * @cfg {String} contentItemTpl
         */
        headerCloseTpl: '<div class="right"></div><div>{text}</div>',

        /**
         * @cfg {String} contentItemTpl
         */
        headerOpenTpl: '<div class="down"></div><div>{text}</div>',

        /**
         * @cfg {String} contentItemTpl
         */
        contentItemTpl: '{text}',

        /**
         * @cfg {Boolean} defaultExpanded
         */
        defaultExpanded: false,

        // @private
        list: null
    },

    initialize: function() {
        var me = this;
        me.doInitialize();
        me.callParent(arguments);
    },

    /**
     * @private
     */
    doInitialize: function() {
        var me = this;
        if (me.getDefaultExpanded()) {
            me.doAllExpanded();
        }
    },

    /**
     * Display all of contents.
     */
    doAllExpanded: function() {
        var me = this,
            list = me.getList(),
            store = list.getStore();

        function doExpand(node) {
            node.expand();
            if (!node.isLeaf()) {
                node.childNodes.forEach(doExpand, me);
            }
        }

        store.each(doExpand, me);
    },

    /**
     * @protected
     */
    applyStore: function(newStore) {
        return this.patchStore(newStore);
    },

    /**
     * @protected
     */
    updateStore: function(newStore, oldStore) {
        var me = this,
            list = me.getList(),
            itemTpl;

        if (!list) {
            itemTpl = new Ext.XTemplate(
                '<tpl if="leaf">',
                    me.getContentItemTpl(),
                '<tpl else>',
                    me.makeHeaderTemplate(),
                '</tpl>',
                {
                    isExpanded: function(values) {
                        return values.expanded;
                    }
                });

            list = Ext.create('Ext.dataview.List', {
                itemTpl: itemTpl
            });

            list.on('itemtap', me.onItemTap, me);

            me.setList(list);
            list.setScrollable(me.getListScrollable());
            me.add(list);
        }

        list.setStore(newStore);
    },

    /**
     * @private
     * @return {String}
     */
    makeHeaderTemplate: function() {
        var me = this;
        return Ext.String.format(me.getHeaderItemTpl(),
            me.getHeaderOpenTpl(), me.getHeaderCloseTpl());
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
        var me = this,
            store = list.getStore(),
            node = store.getAt(index);

        me.fireEvent('itemtap',
            me, list, index, target, record, e);

        if (node.isLeaf()) {
            me.fireEvent('leafitemtap',
                list, index, target, record, e);

        } else {
            if (node.isExpanded()) {
                node.collapse();
            } else {
                node.expand(false, me.onExpand, me);
            }
        }
    },

    /**
     * HACK: See. Can not able to load json data in Sencha touch 2.1 Accordionlist
     *       http://www.sencha.com/forum/showthread.php?253032-Can-not-able-to-load-json-data-in-Sencha-touch-2.1-Accordionlist
     * @private
     * @param  {[type]} store
     * @return {Ext.data.TreeStore}
     */
    patchStore: function(store) {
        store.onProxyLoad = function(operation) {
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
            Ext.callback(operation.getCallback(), operation.getScope() ||
                me, [records, operation, successful]);
        };
        store.onNodeBeforeExpand = function() {
            // Do nothing.
        };
        store.load();
        return store;
    }

});
