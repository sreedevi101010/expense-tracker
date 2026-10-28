import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

test('renders content using React Testing Library and jest-dom', () => {
  render(<p>Testing setup ready</p>)

  expect(screen.getByText('Testing setup ready')).toBeInTheDocument()
})
