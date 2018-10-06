import * as React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Paper from 'components/introduction/Paper';

const Introduction: React.SFC<{}> = () => {
  return (
    <PageTemplate sideBarVisible={true}>
      <Paper />
    </PageTemplate>
  );
};

export default Introduction;
