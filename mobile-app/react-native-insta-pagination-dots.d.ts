declare module 'react-native-insta-pagination-dots' {
  import { ComponentType } from 'react';

  interface PaginationDotProps {
    activeDotColor: string;
    curPage: number;
    maxPage: number;
  }

  const PaginationDot: ComponentType<PaginationDotProps>;

  export default PaginationDot;
}
