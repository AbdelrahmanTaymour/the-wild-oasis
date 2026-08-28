import { createContext, useContext, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface Position {
  x: number;
  y: number;
}

interface MenusContextProps {
  openId: number | null;
  close: () => void;
  open: (id: number) => void;
  position: Position | null;
  setPosition: (pos: Position) => void;
}

const StyledList = styled.ul<{ position: Position }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext<MenusContextProps | undefined>(undefined);

function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId(null);
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: number }) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("Toggle must be used within a Menus component");

  const { openId, close, open, setPosition } = context;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    if (openId === null || openId !== id) open(id);
    else close();
  }

  return (
    <StyledToggle onClick={(e) => handleClick(e)}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: { id: number; children: ReactNode }) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("List must be used within a Menus component");

  const { openId, position, close } = context;

  // Pass HTMLUListElement to match <StyledList> (ul)
  const ref = useOutsideClick<HTMLUListElement>(close, false);

  if (openId !== id || !position) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
}

function Button({
  children,
  icon,
  onClick,
  disabled,
}: {
  children: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const context = useContext(MenusContext);
  if (!context) throw Error("Error");

  const { close } = context;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toogle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
