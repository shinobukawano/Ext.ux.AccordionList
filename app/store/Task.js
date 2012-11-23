Ext.define('AccordionListExample.store.Task', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'AccordionListExample.model.Task'
    ],
    config: {
        defaultRootProperty: 'items',
        model: 'AccordionListExample.model.Task',
        autoLoad: true,

        // XXX: AccordionList doesn't show when loaded from JSON
        // proxy: {
        //     type: 'ajax',
        //     url: 'resources/data/testData.json',
        //     reader: {
        //         type: 'json',
        //         rootProperty: 'items'
        //      }
        // }

              root: {
                items: [{
                  text: 'Today',
                  items: [{
                    text: 'Eat',
                    leaf: true
                  }, {
                    text: 'Sleep',
                    leaf: true
                  }, {
                    text: 'Drinking',
                    leaf: true
                  }]
                }, {
                  text: 'Tomorrow',
                  items: [{
                    text: 'Watch TV',
                    leaf: true
                  }, {
                    text: 'Watch Video',
                    leaf: true
                  }]
                }, {
                  text: 'This week',
                  items: [{
                    text: 'Shopping',
                    leaf: true
                  }]
                }, {
                  text: 'Later',
                  items: [{
                    text: 'Study',
                    items: [{
                      text: 'Eat',
                      leaf: true
                    }, {
                      text: 'Sleep',
                      leaf: true
                    }, {
                      text: 'Drinking',
                      leaf: true
                    }]
                  }]
                }]
              }
            }
});
