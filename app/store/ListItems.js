Ext.define('AccordionListExample.store.ListItems', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'AccordionListExample.model.ListItem'
    ],
    config: {

              defaultRootProperty: 'items',
              model: 'AccordionListExample.model.ListItem',

              // autoLoad: true,
              // proxy: {
              //     type: 'ajax',
              //     url: 'resources/data/testData.json',
              //     reader: {
              //         type: 'json',
              //         rootProperty: 'items'
              //     }
              // },

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
