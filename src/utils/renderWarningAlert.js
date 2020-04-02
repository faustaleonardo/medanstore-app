import React from 'react';
import WarningAlert from '../components/partials/WarningAlert';

export default error => (error ? <WarningAlert content={error} /> : null);
