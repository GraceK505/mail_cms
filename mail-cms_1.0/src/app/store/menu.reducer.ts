import { createReducer, on } from '@ngrx/store';
import { getView, setView, toggleMenuItem } from './menu.actions';

export type ViewsTypes = 'search-slot' | 'editor' | 'social' | 'template-editor' | 'campaign' | 'docs' | null;

export type SubMenu = {
  name: string;
  editorPanel?: boolean;
  panelIcons?: { iconText: string; icon: string; commandName: string }[];
};

export interface MenuItem {
  id: number;
  name: string;
  field: string;
  expanded: boolean;
  subMenu?: SubMenu[];
}

export interface ViewState {
  currentView: ViewsTypes;
}

export const initialState: MenuItem[] = [
  {
    id: 0,
    name: 'Home',
    field: 'home',
    expanded: false,
    subMenu: [
      {
        name: 'home',
        editorPanel: true,
        panelIcons: [
          {
            iconText: 'Clear Canvas',
            icon: 'clear',
            commandName: 'core:canvas-clear',
          },
          {
            iconText: 'Delete',
            icon: 'close',
            commandName: 'core:component-delete',
          },
        ],
      },
    ],
  },
  {
    id: 1,
    name: 'Edit',
    field: 'edit_square',
    expanded: false,
    subMenu: [
      {
        name: 'editor',
        editorPanel: true,
        panelIcons: [
          {
            iconText: 'Clear Canvas',
            icon: 'clear',
            commandName: 'core:canvas-clear',
          },
          {
            iconText: 'Delete',
            icon: 'close',
            commandName: 'core:component-delete',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Search',
    field: 'search',
    expanded: false,
    subMenu: [
      {
        name: 'search-slot',
        editorPanel: true,
        panelIcons: [
          {
            iconText: 'Clear Canvas',
            icon: 'clear',
            commandName: 'core:canvas-clear',
          },
          {
            iconText: 'Delete',
            icon: 'close',
            commandName: 'core:component-delete',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Docs',
    field: 'integration_instructions',
    expanded: false,
    subMenu: [
      {
        name: 'docs',
        editorPanel: true,
        panelIcons: [
          {
            iconText: 'Clear Canvas',
            icon: 'clear',
            commandName: 'core:canvas-clear',
          },
          {
            iconText: 'Delete',
            icon: 'close',
            commandName: 'core:component-delete',
          },
        ],
      },
    ],
  },
    {
    id: 4,
    name: 'Template',
    field: 'dataset',
    expanded: false,
    subMenu: [
      {
        name: 'template-list',
        editorPanel: true,
        panelIcons: [
          {
            iconText: 'Clear Canvas',
            icon: 'clear',
            commandName: 'core:canvas-clear',
          },
          {
            iconText: 'Delete',
            icon: 'close',
            commandName: 'core:component-delete',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Theme',
    field: 'dark_mode',
    expanded: false,
    subMenu: [
      {
        name: 'about',
        editorPanel: true,
        panelIcons: [
          {
            iconText: 'Clear Canvas',
            icon: 'clear',
            commandName: 'core:canvas-clear',
          },
          {
            iconText: 'Delete',
            icon: 'close',
            commandName: 'core:component-delete',
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: 'Social',
    field: 'tag',
    expanded: false,
    subMenu: [
      {
        name: 'social',
        editorPanel: true,
        panelIcons: [
          {
            iconText: 'Clear Canvas',
            icon: 'clear',
            commandName: 'core:canvas-clear',
          },
          {
            iconText: 'Delete',
            icon: 'close',
            commandName: 'core:component-delete',
          },
        ],
      },
    ],
  },
    {
    id: 7,
    name: 'More',
    field: 'settings',
    expanded: false,
    subMenu: [
      {
        name: 'More',
        editorPanel: true,
        panelIcons: [
          {
            iconText: 'Start Campaign',
            icon: 'schedule_send',
            commandName: 'core:canvas-clear',
          },
          {
            iconText: 'Validate Html',
            icon: 'assignment_turned_in',
            commandName: 'core:component-delete',
          },
        ],
      },
    ],
  },
    {
    id: 8,
    name: 'Start',
    field: 'start',
    expanded: false,
    subMenu: [
      {
        name: 'start',
        editorPanel: true,
        panelIcons: [
          {
            iconText: 'Clear Canvas',
            icon: 'clear',
            commandName: 'core:canvas-clear',
          },
          {
            iconText: 'Delete',
            icon: 'close',
            commandName: 'core:component-delete',
          },
        ],
      },
    ],
  },
];

export const initialViewState: { currentView: ViewsTypes } = {
  currentView: 'home' as ViewsTypes,
};


export const viewReducer = createReducer(
  initialViewState,
  on(setView, (state, { view }) => {
    if (view === 'search-slot' || view === 'editor') {
      console.log(`Switching to ${view}`);
    }
    return {
      ...state,
      currentView: view,
    };
  })
);


export const getNewView = createReducer(
  initialViewState,
  on(getView, (state, { currentView }) => {
    let newView: ViewsTypes;
    switch (currentView) {
      case 'search-slot':
      case 'editor':
      case 'social':
      case 'template-editor':
      case 'campaign':
      case 'docs':
        newView = currentView;
        break;
      default:
        newView = 'home' as ViewsTypes;
    }

    return { ...state, currentView: newView };
  })
);

export const menuReducer = createReducer(
  initialState,
  on(toggleMenuItem, (state, { id }) => {
    return state.map((item) =>
      item.id === id ? { ...item, expanded: !item.expanded } : item
    );
  })
);
