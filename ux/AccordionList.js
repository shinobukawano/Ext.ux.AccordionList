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
         * @cfg {String} headerItemCls
         */
        headerItemCls: Ext.baseCSSPrefix + 'accordion-list-header',

        /**
         * @cfg {String} contentItemCls
         */
        contentItemCls: Ext.baseCSSPrefix + 'accordion-list-content',

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
         * @cfg {String} headerCloseTpl
         */
        headerCloseTpl: '<div class="right"></div><div>{0}</div>',

        /**
         * @cfg {String} headerOpenTpl
         */
        headerOpenTpl: '<div class="down"></div><div>{0}</div>',

        /**
         * @cfg {String} contentItemTpl
         */
        contentItemTpl: '{0}',

        /**
         * @cfg {Boolean} defaultExpanded
         */
        defaultExpanded: false,

        /**
         * @cfg {Boolean} useSelectedHighlights
         */
        useSelectedHighlights: true,

        // @private
        list: null
    },

    /**
     * @protected
     */
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
            me.doAllExpand();
        }
    },

    /**
     * Expand all of contents.
     */
    doAllExpand: function() {
        var me = this;
        me.doAll(function expand(node) {
            node.expand();
            if (!node.isLeaf()) {
                node.childNodes.forEach(expand, me);
            }
        });
    },

    /**
     * Collapse all of contents.
     */
    doAllCollapse: function() {
        var me = this;
        me.doAll(function collapse(node) {
            node.collapse();
            if (!node.isLeaf()) {
                node.childNodes.forEach(collapse, me);
            }
        });
    },

    /**
     * @private
     * @param  {Function} updater
     */
    doAll: function(updater) {
        var me = this,
            list = me.getList(),
            store = list.getStore();
        store.each(updater, me);
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
    applyDisplayField: function(newField) {
        return '{' + newField + '}';
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
                    me.makeContentTemplate(),
                '<tpl else>',
                    me.makeHeaderTemplate(),
                '</tpl>',
                {
                    isExpanded: function(values) {
                        return values.expanded;
                    }
                });

            list = Ext.create('Ext.dataview.List', {
                itemTpl: itemTpl,
                scrollToTopOnRefresh: false
            });

            if (me.getUseSelectedHighlights() === false) {
                list.setSelectedCls('');
            }

            list.on('itemtap', me.onItemTap, me);
            list.on('refresh', me.onListRefresh, me);

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
        var me = this,
            displayField = me.getDisplayField(),
            openTpl = Ext.String.format(me.getHeaderOpenTpl(), displayField),
            closeTpl = Ext.String.format(me.getHeaderCloseTpl(), displayField);
        return Ext.String.format(me.getHeaderItemTpl(), openTpl, closeTpl);
    },

    /**
     * @private
     * @return {String}
     */
    makeContentTemplate: function() {
        var me = this,
            displayField = me.getDisplayField();
        return Ext.String.format(me.getContentItemTpl(), displayField);
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
     * @private
     * @param  {Ext.dataview.List} list
     */
    onListRefresh: function(list) {
        var me = this,
            items = list.listItems,
            ln = items.length,
            headerCls = me.getHeaderItemCls(),
            contentCls = me.getContentItemCls(),
            i, item, record, isLeaf;

        for (i = 0; i < ln; i++) {
            item = items[i];
            record = item.getRecord();
            isLeaf = record.get('leaf');
            item.removeCls(isLeaf ? headerCls : contentCls);
            item.addCls(isLeaf ? contentCls : headerCls);
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

        }
        else {
            if (node.isExpanded()) {
                node.collapse();
            }
            else {
                node.expand();
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
