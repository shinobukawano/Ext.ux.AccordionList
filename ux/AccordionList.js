/**
 *  {@link Ext.ux.AccordionList} is a subclass of {@link Ext.Container}
 *  Collapsible List with using Ext.data.TreeStore.
 *  You can expand and collapse contents by header item tap.
 *  Also it can nested infinity.
 *
 *  @author KAWANO Shinobu <http://kawanoshinobu.com>
 *
 *  Simple example:
 *
 *     @example miniphone preview
 *      var data = {
 *         "items" : [{
 *               "text" : "Today",
 *               "items" : [{
 *                           "text" : "Eat",
 *                           "leaf" : true
 *                       }, {
 *                           "text" : "Sleep",
 *                           "leaf" : true
 *                       }, {
 *                           "text" : "Drinking",
 *                           "leaf" : true
 *                       }]
 *           }, {
 *               "text" : "Tomorrow",
 *               "items" : [{
 *                           "text" : "Watch TV",
 *                           "leaf" : true
 *                       }, {
 *                           "text" : "Watch Video",
 *                           "leaf" : true
 *                       }]
 *           }, {
 *               "text" : "This week",
 *               "items" : [{
 *                           "text" : "Shopping",
 *                           "leaf" : true
 *                       }]
 *           }, {
 *               "text" : "Later",
 *               "items" : [{
 *                           "text" : "Eat",
 *                           "leaf" : true
 *                       }, {
 *                           "text" : "Sleep",
 *                           "leaf" : true
 *                       }, {
 *                           "text" : "Drinking",
 *                           "leaf" : true
 *                       }]
 *           }]
 *      };
 *
 *      Ext.define('Task', {
 *          extend: 'Ext.data.Model',
 *          config: {
 *              fields: [{
 *                  name: 'text',
 *                  type: 'string'
 *              }]
 *          }
 *      });
 *
 *      var store = Ext.create('Ext.data.TreeStore', {
 *          model: 'Task',
 *          defaultRootProperty: 'items',
 *          root: data
 *      });
 *
 *      var accordionList = Ext.create('Ext.ux.AccordionList', {
 *          fullscreen: true,
 *          store: store
 *      });
 *
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
         * @cfg {String/String[]} cls
         * The CSS class to add to this component's element.
         */
        cls: Ext.baseCSSPrefix + 'accordion-list',

        /**
         * @cfg {String} headerItemCls
         * The CSS class to add to this header item's element.
         */
        headerItemCls: Ext.baseCSSPrefix + 'accordion-list-header',

        /**
         * @cfg {String} contentItemCls
         * The CSS class to add to this header item's element.
         */
        contentItemCls: Ext.baseCSSPrefix + 'accordion-list-content',

        /**
         * @cfg {String/Object} layout
         * Default layout config.
         */
        layout: {
            type: 'fit'
        },

        /**
         * @cfg {Ext.data.TreeStore/Object} store
         * Store instanse or tree store'a data object.
         */
        store: null,

        /**
         * @cfg {String} displayField
         * Defaults template's display field.
         */
        displayField: 'text',

        /**
         * @cfg {Boolean} scrollable
         * List's default listScrollable config.
         */
        listScrollable: true,

        /**
         * @cfg {String} headerItemTpl
         * Header item's html template.
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
         * Header item's html template which it closing.
         */
        headerCloseTpl: '<div class="right"></div><div>{0}</div>',

        /**
         * @cfg {String} headerOpenTpl
         * Header item's html template which it opening.
         */
        headerOpenTpl: '<div class="down"></div><div>{0}</div>',

        /**
         * @cfg {String} contentItemTpl
         * Content item's html template.
         */
        contentItemTpl: '{0}',

        /**
         * @cfg {Boolean} defaultExpanded
         * Whether items all expanded or not.
         */
        defaultExpanded: false,

        /**
         * @cfg {Boolean} useSelectedHighlights
         * Whether selected items highlights or not.
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
     * Loads data into the store.
     */
    load: function() {
        this.getStore().load();
    },

    /**
     * Remove all items from the store.
     */
    removeAll: function() {
        this.getStore().removeAll();
    },

    /**
     * Gets the number of cached records.
     * @return {Number}
     */
    getCount: function() {
        var store = this.getStore();
        return Ext.isEmpty(store) ? 0 : store.getCount();
    },

    /**
     * Gets the number of all records.
     * @return {Number}
     */
    getAllCount: function() {
        var store = this.getStore();
        return Ext.isEmpty(store) ? 0 : store.getAllCount();
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

        if (store.getAutoLoad()) {
            Ext.defer(function() {
                var list = this.getList(),
                    tmp = list.getLoadingText();
                list.setLoadingText(null);
                store.load();
                list.setLoadingText(tmp);
            }, 500, this);
        }
        return store;
    }

});
