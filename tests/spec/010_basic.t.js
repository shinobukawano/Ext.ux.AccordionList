
describe('Ext.ux.AccordionList basic', function(t) {

    var accordionList = t.cq1('accordionlist[itemId=basic]');
    t.cq1('tabpanel').setActiveItem(0);

    t.it('says Hello!', function(t) {
        t.expect(accordionList).toBeDefined();
    });

    t.it('should loads nested json data', function(t) {
        t.expect(accordionList.getCount()).toEqual(4);
        t.expect(accordionList.getAllCount()).toEqual(12);
    });

    t.it('should expand child items', function(t) {
        t.chain({
            action: 'tap',
            target: '.x-list:not(.x-item-hidden) .x-list-item-first'
        },
        { action : 'wait', delay : 500 },
        function() {
            t.expect(accordionList.getCount()).toEqual(7);
        });
    });

    t.it('should collapse child items', function(t) {
        t.chain({
            action: 'tap',
            target: '.x-list:not(.x-item-hidden) .x-list-item-first'
        },
        { action : 'wait', delay : 500 },
        function() {
            t.expect(accordionList.getCount()).toEqual(4);
        });
    });

    t.it('able to expand all items', function(t) {
        var button = t.cq1('segmentedbutton[itemId=basic] button[action=expand]');
        t.chain({
            action: 'click',
            target: button.element
        },
        { action : 'wait', delay : 500 },
        function() {
            t.expect(accordionList.getCount()).toEqual(12);
        });
    });

    t.it('able to collapse all items', function(t) {
        var button = t.cq1('segmentedbutton[itemId=basic] button[action=collapse]');
        t.chain({
            action: 'click',
            target: button.element
        },
        { action : 'wait', delay : 500 },
        function() {
            t.expect(accordionList.getCount()).toEqual(4);
        });
    });

});
