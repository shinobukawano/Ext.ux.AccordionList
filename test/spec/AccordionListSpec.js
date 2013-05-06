describe('Ext.ux.AccordionList', function() {
    var accordionList;

    beforeEach(function() {
        accordionList = Ext.create('Ext.ux.AccordionList');
    });

    it('says Hello!', function() {
        expect(accordionList).toBeDefined();
    });

    it('loads nested json data', function() {
        accordionList.setStore(Ext.create('AccordionListExample.store.Task'));
        accordionList.load();

        waitsFor(function() {
            return accordionList.getCount() > 0;
        }, "Now, loading data...", 10000);

        runs(function () {
            expect(accordionList.getCount()).toEqual(4);
            expect(accordionList.getAllCount()).toEqual(13);
        });
    });

    it('should remove all record', function() {
        accordionList.setStore(Ext.create('AccordionListExample.store.Task'));
        accordionList.load();

        waitsFor(function() {
            return accordionList.getCount() > 0;
        }, "Now, loading data...", 10000);

        runs(function () {
            accordionList.removeAll();
            expect(accordionList.getCount()).toEqual(0);
            expect(accordionList.getAllCount()).toEqual(0);
        });
    });

    isAllExpanded = function() {
        var nodes = accordionList.getList().getStore().getNode().childNodes;
        return nodes.every(function expanded (v) {
            var hasChild = v.childNodes > 0;
            return v.isExpanded() &&
                (hasChild ? v.childNodes.every(expanded) : true);
        });
    };

    isAllCollapsed = function() {
        var nodes = accordionList.getList().getStore().getNode().childNodes;
        return nodes.every(function collapsed (v) {
            var hasChild = v.childNodes > 0;
            return v.isExpanded() === false &&
                (hasChild ? v.childNodes.every(collapsed) : true);
        });
    };


    it('should expand all item when configured defaultExpanded', function() {
        accordionList.setDefaultExpanded(true);
        accordionList.setStore(Ext.create('AccordionListExample.store.Task'));
        accordionList.load();

        waitsFor(function() {
            return accordionList.getCount() > 0;
        }, "Now, loading data...", 10000);

        runs(function () {
            accordionList.doInitialize();
            expect(isAllExpanded(accordionList)).toBeTruthy();
        });
    });

    it('should expand all item when invoked doAllExpand', function() {
        accordionList.setStore(Ext.create('AccordionListExample.store.Task'));
        accordionList.load();

        waitsFor(function() {
            return accordionList.getCount() > 0;
        }, "Now, loading data...", 10000);

        runs(function () {
            accordionList.doAllExpand();
            expect(isAllExpanded(accordionList)).toBeTruthy();
        });
    });

    it('should collapse all item when invoked doAllCollapse', function() {
        accordionList.setStore(Ext.create('AccordionListExample.store.Task'));
        accordionList.load();

        waitsFor(function() {
            return accordionList.getCount() > 0;
        }, "Now, loading data...", 10000);

        runs(function () {
            accordionList.doAllCollapse();
            expect(isAllCollapsed(accordionList)).toBeTruthy();
        });
    });

    it('header item should have headerItemCls', function() {
        accordionList.setStore(Ext.create('AccordionListExample.store.Task'));
        accordionList.load();

        waitsFor(function() {
            return accordionList.getCount() > 0;
        }, "Now, loading data...", 10000);

        runs(function () {
            var elems = accordionList.element.query('.' + accordionList.getHeaderItemCls());
            expect(elems.length).toEqual(4);
        });
    });

    it('content item should have contentItemCls', function() {
        accordionList.setStore(Ext.create('AccordionListExample.store.Task'));
        accordionList.load();

        waitsFor(function() {
            return accordionList.getCount() > 0;
        }, "Now, loading data...", 10000);

        runs(function () {
            accordionList.doAllExpand();
            var elems = accordionList.element.query('.' + accordionList.getContentItemCls());
            expect(elems.length).toEqual(9);
        });
    });

});
