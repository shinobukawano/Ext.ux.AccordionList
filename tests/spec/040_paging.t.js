
describe('Ext.ux.AccordionList paging', function(t) {

    var accordionList = t.cq1('accordionlist[itemId=paging]');
    t.cq1('tabpanel').setActiveItem(3);

    t.it('says Hello!', function(t) {
        t.expect(accordionList).toBeDefined();
    });

    t.it('should loads nested json data', function(t) {
        t.chain({
            action: 'wait',
            delay: 500
        }, function() {
            t.expect(accordionList.getCount()).toEqual(8);
            t.expect(accordionList.getAllCount()).toEqual(40);
        });
    });

});
