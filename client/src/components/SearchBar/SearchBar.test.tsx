import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar'; // Assurez-vous d'importer correctement votre composant

describe('Test du composant SearchBar', () => {
  it('Should format the input correctly when inputType is not text', async () => {
    const handleChange = vi.fn();

    render(<SearchBar handleChange={handleChange} inputType="number" />);

    const input = screen.getByRole('textbox') as HTMLInputElement; // Cast vers HTMLInputElement

    // Simuler la saisie de texte avec des chiffres
    fireEvent.change(input, { target: { value: '392391960200102' } });

    // Vérifier que le texte affiché dans l'input est bien formaté
    expect(input.value).toBe('3 92 39 19 602 001 02');
  });

  it('Should call handleChange with the sanitized value', async () => {
    const handleChange = vi.fn();

    render(<SearchBar handleChange={handleChange} inputType="number" />);

    const input = screen.getByRole('textbox') as HTMLInputElement; // Cast vers HTMLInputElement

    // Simuler la saisie de texte avec des chiffres
    fireEvent.change(input, { target: { value: '123456789012' } });

    // Vérifier que handleChange a été appelé avec la valeur sans espaces
    expect(handleChange).toHaveBeenCalledWith('123456789012');
  });
});
