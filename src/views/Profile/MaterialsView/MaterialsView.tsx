import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthorities } from '../../../models/authorities';
import { IExpert } from '../../../old/lib/types';
import AdminTable from '../AdminTable/AdminTable';
import MaterialsDraft from './MaterialsDraft';
import MaterialsPublished from './MaterialsPublished';

export interface IExpertProfileViewProps {
  expert: IExpert;
}

export const MaterialsView: React.FC<IExpertProfileViewProps> = ({
  expert,
}) => {
  const authorities = useSelector(selectAuthorities);
  const isAdmin = authorities.data?.includes('SET_IMPORTANCE');

  return isAdmin ? (
    <AdminTable />
  ) : (
    <>
      <MaterialsDraft expertId={expert.id} expert={expert} />
      <MaterialsPublished expertId={expert.id} />
    </>
  );
};
