import * as React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ManagementContainer from 'containers/admin/ManagementContainer';

// interface ManagementProps {
// }

const Management: React.SFC<{}> = props => {
  return (
    <PageTemplate sideBarVisible={true}>
      <ManagementContainer />
    </PageTemplate>
  );
};

export default Management;
