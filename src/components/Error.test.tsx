import { cleanup, screen, render } from '@testing-library/react';
import React from 'react';
import Error from './Error';
import { ThemeProvider } from "@chakra-ui/core";

// wrapper to render things that are using chrackra provider for theme
export const renderWithTheme = (comp: any) => {
  const Wrapper = (props: { children?: React.ReactNode; }) => (
    <ThemeProvider>{props.children}</ThemeProvider>
  )
  return render(comp, { wrapper: Wrapper })
}

afterEach(cleanup)

const defaultData = 'some error text'

test('renders correctly', () => {
  renderWithTheme(<Error msg={defaultData} />)
  expect(screen.getByText(defaultData)).toBeInTheDocument()

});