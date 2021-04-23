export function reduxFastConnect(
  connect: any,
  storeName: string,
  component: any,
  actionList: Record<string, (...args: any[]) => void>,
): any {
  function mapStateToProps(state: { [key: string]: { [key: string]: unknown } }) {
    return state[storeName];
  }

  function mapDispatchToProps(dispatch: (arg: unknown) => void) {
    const aList = {} as any;

    for (const key in actionList) {
      aList[key] = (...args: any[]) => {
        dispatch(actionList[key](...args));
      };
    }

    return aList;
  }

  return connect(mapStateToProps, mapDispatchToProps as any)(component);
}

export function smartPage(
  fn: (...args: any[]) => any,
  connect: any,
  storeName: string,
  actionList: Record<string, (...args: any[]) => void>,
): any {
  function mapStateToProps(state: any): any {
    return state[storeName]; //
  }

  function mapDispatchToProps(dispatch: (arg: unknown) => void) {
    const aList = {} as any;

    for (const key in actionList) {
      aList[key] = (...args: any[]) => {
        dispatch(actionList[key](...args));
      };
    }

    return aList;
  }

  function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
    return {
      ...stateProps,
      ...dispatchProps,
    };
  }

  return connect(mapStateToProps, mapDispatchToProps as any, mergeProps)(fn);
}
