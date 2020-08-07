export default {

  // home is a section without childs, set as an empty array
  dasboard: [],
  home: [],

  customers: [

    {
      type: 'title',
      txt: 'Customers',
      icon: 'fa fa-users context-menu__title-icon',
    },

    {
      type: 'link',
      txt: 'List Customers',
      link: '/dashboard',
    },

    {
      type: 'link',
      txt: 'List Contacts',
      link: '/dashboard',
    },

    {
      type: 'link',
      txt: 'List Newsletters',
      link: '/dashboard',
    },

  ],

  responses: [

    {
      type: 'title',
      txt: 'Responses',
      icon: 'fa fa-users context-menu__title-icon',
    },

    {
      type: 'link',
      txt: 'Create Response',
      link: '/dashboard',
    },

    {
      type: 'link',
      txt: 'All Responses',
      link: '/dashboard',
    }

  ],

  categories: [

    {
      type: 'title',
      txt: 'Categories',
      icon: 'fa fa-users context-menu__title-icon',
    },

    {
      type: 'link',
      txt: 'Create Category',
      link: '/dashboard',
    },

    {
      type: 'link',
      txt: 'List Categories',
      link: '/dashboard',
    }

  ],

  menuItems: [

    {
      type: 'title',
      txt: 'Menu Items',
      icon: 'fa fa-users context-menu__title-icon',
    },

    {
      type: 'link',
      txt: 'Create Menu Item',
      link: '/dashboard',
    },

    {
      type: 'link',
      txt: 'List Menu Items',
      link: '/dashboard',
    }

  ],

  menus: [

    {
      type: 'title',
      txt: 'Menus',
      icon: 'fa fa-users context-menu__title-icon',
    },

    {
      type: 'link',
      txt: 'Create Menu',
      link: '/dashboard',
    },

    {
      type: 'link',
      txt: 'List Menus',
      link: '/dashboard',
    }

  ],

  events: [

    {
      type: 'title',
      txt: 'Events',
      icon: 'fa fa-users context-menu__title-icon',
    },

    {
      type: 'link',
      txt: 'Create Event',
      link: '/dashboard',
    },

    {
      type: 'link',
      txt: 'List Event',
      link: '/dashboard',
    }

  ],

  account: [

    {
      type: 'title',
      txt: 'My Account',
      icon: 'fa fa-user context-menu__title-icon',
    },

    {
      type: 'link',
      txt: 'Change Password',
      link: '/dashboard',
    },

    {
      type: 'link',
      txt: 'Change Settings',
      link: '/dashboard',
    },

    {
      type: 'link',
      txt: 'Logout',
      link: '/dashboard',
    },

    {
      type: 'title',
      txt: 'Change Subscription',
      icon: 'fa fa-credit-card context-menu__title-icon',
    },

    {
      type: 'link',
      txt: 'Plans',
      link: '/dashboard',
    },

    {
      type: 'link',
      txt: 'Payment Settings',
      link: '/dashboard',
    },

    {
      type: 'link',
      txt: 'Payment History',
      link: '/dashboard',
    },

  ],

};
