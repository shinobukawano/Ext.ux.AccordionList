
describe('Ext.ux.AccordionList components', function(t) {

    var accordionList = t.cq1('accordionlist[itemId=components]');
    t.cq1('tabpanel').setActiveItem(4);

    t.it('says Hello!', function(t) {
        t.expect(accordionList).toBeDefined();
    });

    t.it('should loads nested json data', function(t) {
        t.expect(accordionList.getCount()).toEqual(3);
        t.expect(accordionList.getAllCount()).toEqual(13);
    });

});
