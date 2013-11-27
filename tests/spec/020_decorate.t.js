
describe('Ext.ux.AccordionList decorate', function(t) {

    var accordionList = t.cq1('accordionlist[itemId=decorate]');
    t.cq1('tabpanel').setActiveItem(1);

    t.it('says Hello!', function(t) {
        t.expect(accordionList).toBeDefined();
    });

    t.it('should loads nested json data', function(t) {
        t.expect(accordionList.getCount()).toEqual(4);
        t.expect(accordionList.getAllCount()).toEqual(12);
    });

});
