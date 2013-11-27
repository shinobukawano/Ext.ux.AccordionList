
describe('Ext.ux.AccordionList nested', function(t) {

    var accordionList = t.cq1('accordionlist[itemId=nested]');
    t.cq1('tabpanel').setActiveItem(2);

    t.it('says Hello!', function(t) {
        t.expect(accordionList).toBeDefined();
    });

    t.it('should loads nested json data', function(t) {
        t.expect(accordionList.getCount()).toEqual(2);
        t.expect(accordionList.getAllCount()).toEqual(37);
    });

});
