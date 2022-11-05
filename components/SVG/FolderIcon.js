import { Icon } from "@chakra-ui/react";

export const FolderIcon = ({ fill, size, height, width, ...props }) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        opacity="0.4"
        d="M16.8843 5.11485H13.9413C13.2081 5.11969 12.512 4.79355 12.0474 4.22751L11.0782 2.88762C10.6214 2.31661 9.9253 1.98894 9.19321 2.00028H7.11261C3.37819 2.00028 2.00001 4.19201 2.00001 7.91884V11.9474C1.99536 12.3904 21.9956 12.3898 21.9969 11.9474V10.7761C22.0147 7.04924 20.6721 5.11485 16.8843 5.11485Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.8321 6.54346C21.1521 6.91754 21.3993 7.34785 21.5612 7.81236C21.8798 8.76704 22.0273 9.77029 21.9969 10.7761V16.0291C21.9956 16.4716 21.963 16.9134 21.8991 17.3513C21.7775 18.124 21.5057 18.8655 21.0989 19.5341C20.9119 19.8571 20.6849 20.1552 20.4231 20.4214C19.2383 21.5089 17.665 22.0749 16.0574 21.992H7.93062C6.32051 22.0743 4.74463 21.5085 3.55602 20.4214C3.29742 20.1547 3.07338 19.8566 2.88916 19.5341C2.48476 18.866 2.2187 18.1237 2.10671 17.3513C2.0355 16.9141 1.99982 16.472 2.00001 16.0291V10.7761C1.99984 10.3374 2.02358 9.89895 2.07115 9.46281C2.08115 9.38629 2.09615 9.31101 2.11099 9.23652C2.13574 9.11233 2.16006 8.99031 2.16006 8.86829C2.25032 8.34196 2.41497 7.83109 2.64909 7.35094C3.34263 5.86908 4.76526 5.11485 7.09483 5.11485H16.8754C18.1802 5.01393 19.4753 5.40673 20.5032 6.21515C20.6215 6.31552 20.7316 6.42532 20.8321 6.54346ZM6.97035 15.5411H17.0355H17.0533C17.2741 15.5507 17.4896 15.4716 17.6517 15.3216C17.8137 15.1715 17.9088 14.963 17.9157 14.7425C17.9282 14.5487 17.8644 14.3576 17.7379 14.2101C17.5924 14.0118 17.3618 13.8934 17.1155 13.8906H6.97035C6.51366 13.8906 6.14344 14.2601 6.14344 14.7159C6.14344 15.1716 6.51366 15.5411 6.97035 15.5411Z"
        fill={fill}
      />
    </Icon>
  );
};
