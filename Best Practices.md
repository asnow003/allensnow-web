---
id: component-best-practices
title: Component Best Practices
hide_title: true
---

# Component Best Practices

## Use existing components

Before starting feature development, check which components from [our component libraries](https://unity-technologies.github.io/unity-common-frontend-lib-docs/) can be used to implement the designs truthfully.
Most features will use a rather limited subset of components from @unity/react-components, @unity/react-labs and @material-ui/core.
In majority of cases there’s little or no need to write custom style declarations, and the layouts can be built using the available components.

We’d expect everybody starting the development to be familiar with components available in the latest versions of @unity/react-components and @unity/react-labs, as well as those available at https://material-ui.com (Material UI v4).

Whenever you see that a component exists both in our libraries and in Material UI, defer to using our own version. Examples: Button, Breadcrumbs, Typography, Chip, Table (mui) => Table (lib), Card (mui) => DescriptionCard (lib).

If you’re not sure whether there exists a component matching the designs, the best place to ask would be the `#unity-frontend-lib` Slack channel.

We are also in the process of migrating to Material UI v5 which requires revamping all our existing components. This work continues in https://github.com/Unity-Technologies/unity-dimensions. You can preview the progress [here](https://services.docs.internal.unity3d.com/unity-dimensions/). For questions visit `#unity-dimensions`.

## Split components often

Files are free, instead of packing your file with a lot of JSX and creating multiple render methods for a class component, create new component files instead. Smaller files are easier to unit test :)

## Naming conventions

### Methods that return JSX

Prefix methods that return JSX with `render`

```js
renderLoader() {
  return <Loader />;
}

render() {
  <div>
    {this.renderLoader()}
  </div>
}
```

### Partials

Suffix partials with `el`

```js
render() {
  const loaderEl = <Loader />;
  return (
    <div>
      {loaderEl}
    </div>
  );
}
```

### Handlers and callbacks

All handler functions should be prefixed with `handle` and all callback prop names should be prefixed with `on`

```js
render() {
  return (
    <CountrySelect onCountrySelect={this.handleCountrySelect} />
  );
}
```

## Return early

### Good

```js
render() {
  const { userData, projects } = this.props;

  if (userData) {
    return null;
  }

  const relevantProjects = projects.filter((project) => project.isRelevant)

  return relevantProjects.map((project) => <Project {...project} />);
}
```

### Bad

See how we run the filtering before returning null even though we could return early

```js
render() {
  const { userData, projects } = this.props;
  const relevantProjects = projects.filter((project) => project.isRelevant)

  if (userData) {
    return null;
  }

  return relevantProjects.map((project) => <Project {...project} />);
}
```

## Avoid custom styling

Most designs should be achievable by using components already existing in [Material UI](https://material-ui.com/), in our [component library](https://github.com/Unity-Technologies/unity-common-frontend-lib), by using built-in [theme variables](https://material-ui.com/customization/default-theme/) or by our [custom mixins](https://github.com/Unity-Technologies/unity-common-frontend-lib/blob/master/packages/%40unity/react-components/theme/mixins.js)

## Avoid logic in JSX

This is to enforce creating meaningful variable names for expressions.

### Good

```js
render() {
  const isFooOpen = foo.bar.length > 0;
  return <Foo open={isFooOpen} />
}

render() {
  return <Foo onClick={this.handleClick} />
}
```

### Bad

```js
render() {
  return <Foo open={foo.bar.length > 0} />
}

render() {
  return <Foo onClick={() => this.setState({ ... })} />
}
```

## Avoid multiline ternaries in JSX

Inline ternaries are fine

### Good

```js
render() {
  const isClickMeVisible = button === 'clickme';
  const isClickMeInsteadVisible = button === 'clickme';

  if (isClickMeVisible) {
    return (
      <div>
        <button>
          Click me!
        </button>
      </div>
    );
  }

  if (isClickMeInsteadVisible) {
    return (
      <div>
        <button>
          Click me instead!
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Best Button out of them all</h2>
      <img src="kitty.png" />
      <button>
        No! I deserve to be clicked!
      </button>
    </div>
  );
}
```

### Bad

```js
render() {
  return button === 'clickme' ? (
    <div>
      <button>
        Click me!
      </button>
    </div>
  ) : button === 'clickmeinstead' ? (
    <div>
      <button>
        Click me instead!
      </button>
    </div>
  ) : (
    <section>
      <h2>Best Button out of them all</h2>
      <img src="kitty.png" />
      <button>
        No! I deserve to be clicked!
      </button>
    </section>
  );
}
```

## Prefer functional components and use arrow functions to declare functions

- Aim to write your features using hooks
- Declare your components as arrow functions instead of regular functions. There is no magical reason behind this other than code consistency.

### Good

```jsx
const Component = () => {
  const [toggled, setToggled] = React.useState(false);

  const handleToggle = () => {
    setToggled((toggled) => !toggled);
  };

  return toggled ? 'I am toggled' : 'I am not toggled';
};
```

### Bad

```jsx
class Component extends React.Component {
  constructor() {
    super();
    this.state = {
      toggled: false,
    };
  }

  handleToggle = () => {
    this.setState((prevState) => ({ toggled: !prevState.toggled }));
  };

  render() {
    return this.state.toggled ? 'I am toggled' : 'I am not toggled';
  }
}
```

### Bad (but not really)

```jsx
function Component() {
  const [toggled, setToggled] = React.useState(false);

  const handleToggle = () => {
    setToggled((toggled) => !toggled);
  };

  return toggled ? 'I am toggled' : 'I am not toggled';
}
```

## Memoize heavy computations

You can use memoize-one to memoize a result of a function to avoid recomputing on each render even when the underlying data does not change.
For example, if you are translating strings to render a list of countries, you can memoize the translated countries array.

## Prefer using `null` over `undefined`

Using `null` over `undefined` is especially useful in default prop values and results of conditional rendering to distinguish between initial values and passed values resolving to `undefined` while still being able to use conditional logic depending on falsy values.

### Good

```js
Foo.defaultProps = {
  bar: null, // passing uninitialized value will be easily distinguishable from initial value
};
```

### Bad

```js
Foo.defaultProps = {
  bar: undefined, // passing uninitialized value will be undistinguishable from initial value
};
```

## Material UI <Box />

- Pay attention to when you need `Box` and when you do not. Box will create a new HTML element. In many cases you want to override the class instead. Also, remember that you can choose the underlying component for the `Box`. Prefer semantic markup.
- Do not use the abbreviated versions for applying margin and padding. We are trying to maximize readability of our code and using abbreviations such as `py` will obfuscate our code and make it less accessible to people unfamiliar with the `Box` component.
- Do not use `Box` component for components that are meant to be reusable. For styling such component, leverage makeStyles and attach classes to underlying elements. This will allow consumers of that component to override the styling on underlying elements via the use of classes prop.

### Good (not generating unnecessary markup)

```jsx
<ContainerThatNeedsPadding className={classes.paddingClass} />
```

### Bad (we should likely apply the padding directly to container component)

```jsx
<Box padding={3}>
  <ContainerThatNeedsPadding />
</Box>
```

### Good (avoiding abbreviations)

```jsx
<Box padding={3} marginY={1}>
  <MyContent />
</Box>
```

### Bad (we are using abbreviations)

```jsx
<Box p={3} my={1}>
  <MyContent />
</Box>
```

### Good (styles are overridable)

```jsx
const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(3),
  },
  innerElement: {
    backgroundColor: 'red',
  },
}));

const MyReusableComponent = (props) => {
  const { className } = props;
  const classes = useStyles(props);
  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.innerElement}>Content</div>
    </div>
  );
};
```

### Bad (styles are not overridable)

```jsx
const MyReusableComponent = () => {
  return (
    <Box padding={3}>
      <Box backgroundColor="red">Content</Box>
    </Box>
  );
};
```

## Handle error cases & loading states

Requests can fail, or take a very long time and our UIs should handle these cases smoothly. For error pages it is recommended to provide the user with an action they can perform to try to resolve the issue, e.g. "Retry", "Take me home", "Contact support" etc.

### Surface the error to the user in a clear way

Simply logging or throwing the error is not enough, it is recommended to dispatch an error in order to surface this initial problem to the user. If you don't redirect to the user to a error page then you can use the notification system to alert them to the issue.

```js
dispatch(
  showNotification({
    message: intl.formatMessage(messages.errorMessage),
  })
);
```

NOTE: if the view that generated the error is contained inside a modal, bear in mind that the notification will be rendered on the page beneath the modal.

In these cases it is better to show a banner on the page, preferably between the header and body of the modal component.

```js
<Dialog>
  <ModalTitle>{intl.formatMessage(messages.dialogTitle)}</ModalTitle>
  <Banner
    inset
    animate
    dividerBottom
    state="error"
    open={request.isRejected}
    content={
      <>
        <ErrorIcon color="error" />
        <Typography variant="body">{intl.formatMessage(messages.requestError)}</Typography>
      </>
    }
  />
  <ModalContent>{intl.formatMessage(messages.dialogContent)}</ModalContent>
  <ModalActions>
    <Button onClick={dialogOpenable.close}>{intl.formatMessage(commonMessages.cancel)}</Button>
    <Button loading={request.isPending} onClick={handleAction} color="danger">
      {intl.formatMessage(commonMessages.accept)}
    </Button>
  </ModalActions>
</Dialog>
```

## Make views responsive

We strive for great UX regardless of screen size or device type. Make sure all the views work well across different viewport sizes.

```js
const styles = ({ breakpoints, spacing }) => ({
  [breakpoints.down('sm'): {
    marginLeft: spacing.unit * 3,
  },
});

// or

<Hidden smDown>
  <MyComponent />
</Hidden>
```

## Make modals standalone components

It's very useful to separate modals (popups, dialogs) from the buttons which trigger opening them. This has the following benefits:

- For more than 1 popover in a view, it reduces the amount of code needed to handle opening and closing the modals (raising popover state to the parent)
- Makes it possible to trigger that modal from different context and using different trigger element to open it
- Makes it possible to trigger that modal from within `StateCard` and similar components

### Good

```js
<Button onClick={this.handleModalOpen}>
  Open modal
<Button>
<MyModal open={this.state.isModalOpen} />
```

### Bad

```js
<MyModalAndItsOpener />
```

## Navigate to a route using Link component

When creating elements which redirect to a different route within the application, it's important to ensure that those links can be opened in a new window or tab. This can be achieved by using `react-router-dom/Link` instead of using `history.push()` directly.

### Good

```js
import { Link as RouterLink } from 'react-router-dom';
import Button from '@unity/react-components/button';
import Link from '@unity/react-components/link';
import MenuItem from '@material-ui/core/MenuItem';

<Button component={RouterLink} to="/bar">
  Go to the bar
<Button>

<Link component={RouterLink} to="/foo">
  Configure Foo
</Link>

<MenuItem component={RouterLink} to="/foo-bar">
  View FooBar
</MenuItem>

```

### Bad

```js
<Link onClick={() => history.push('/bar')}>
  Go to the bar
<Link>

<Button onClick={() => setActivePage('bar')}>
  Bar
<Button>
```

## Use ProjectChangeRedirect component for redirects after `projectId` change

Some pages and features might be enabled for one projects and disabled for other. In these cases changing current project while viewing these pages might cause app crushes or redirecting to 404 page. Instead of implementing your own solutions based on `history.push()`, please, use `ProjectChangeRedirect` component. This component redirect user to the route passed to it as a `path` prop if `projectId` change would be detected.

### Good

```js
import ProjectChangeRedirect from '@unity-dashboard/components/project-change-redirect';

const Component = ({ children }) => {
  return (
    <>
      <ProjectChangeRedirect path="/path/to/parent/page" />
      {children}
    </>
  );
};
```

### Bad

```js
import { useParams, useHistory } from 'react-router-dom';

const BucketPageLayout = ({ children }) => {
  const { projectId } = useParams();
  const history = useHistory();
  const initialProjectIdRef = React.useRef(projectId);

  React.useEffect(() => {
    if (projectId !== initialProjectIdRef.current) {
      history.push('/path/to/parent/page');
    }
  }, [projectId, history]);

  return (
    <>
      {children}
    </>
  );
};
```

## Eslint Rules

### react-hooks/exhaustive-deps

`exhaustive-deps` is used to enforce the React’s Hook rule: Every value referenced inside
the hook function should also appear in the dependencies array. This is to prevent
introducing bugs or causing unwanted side effects. For example, the following code would throw a
warning because `fetchPageData` is not included as a dependency, even though it is a function
and not a value that is expected to change:

```js
const Buckets = () => {
  const dispatch = useDispatch();

  const fetchPageData = () => {
    dispatch(getBuckets(projectId, 1, 500)).catch(logger.logError);
  };

  React.useEffect(() => {
    fetchPageData();
  }, [projectId]);

  return <div />;
};
```

Simply adding `fetchPageData` to the dependency array would fix it, but it would cause the following
error to be thrown as a result:

```
ESLint: The 'fetchPageData' function makes the dependencies of useEffect Hook (at line 10) change
on every render. To fix this, wrap the definition of 'fetchPageData' in its own useCallback()
Hook.(react-hooks/exhaustive-deps)
```

An easier solution to this problem would be to move the declaration of `fetchPageData` to live outside this React
component but as it also relies on the `dispatch` hook, it's not that simple. Wrapping it in its own `useCallback`
hook will tell React not to re-define the `fetchPageData` on each render:

```js
const Buckets = () => {
  const dispatch = useDispatch();

  const fetchPageData = React.useCallback(() => {
    dispatch(getBuckets(projectId, 1, 500)).catch(logger.logError);
  }, [projectId, dispatch]);

  React.useEffect(() => {
    fetchPageData();
  }, [projectId, fetchPageData]);

  return <div />;
};
```

The caveat to this solution is internally in React, useCallback Hook has to compare the dependencies from
the dependency array for every re-render to decide whether it should re-define the function. Often the
computation for this comparison can be more expensive than just re-defining the function.
