import { describe, it, beforeEach, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './LoginPage';

// Mock the axios module
vi.mock('axios');

describe('LoginPage', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear all mock calls between tests
        localStorage.clear();
    });

    it('should render the login form', () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );
    
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('should display an error message on invalid login', async () => {
        axios.post.mockRejectedValue(new Error('Invalid credentials'));
    
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );
    
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'invalidUser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'invalidPassword' } });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    
        await waitFor(() => {
            expect(screen.getByText(/your username or password is incorrect!/i)).toBeInTheDocument();
        });
    });

    it('should store the token and redirect on successful login', async () => {
        const token = 'dummy-token';
        axios.post.mockResolvedValue({ data: { token } });
    
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );
    
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'test0' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
    
        fireEvent.click(screen.getByText(/sign in/i, { selector: 'button' }));
    
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
        });
    
        await waitFor(() => {
            expect(localStorage.getItem('token')).toBe(token);
        });
    });

    it('should redirect to /admin if token is present in localStorage', () => {
        localStorage.setItem('token', 'dummy-token');
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );
        expect(window.location.pathname).toBe('/admin');
    });
});
