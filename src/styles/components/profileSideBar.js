import styled from "@emotion/styled";

export const ProfileSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 260px;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    display: none;
  }
`;