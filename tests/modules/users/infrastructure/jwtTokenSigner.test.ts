import JwtTokenSigner from '../../../../src/modules/users/infrastructure/jwtTokenSigner';

describe('JwtTokenSigner', () => {
  it('should sign and verify a token with expected payload', () => {
    const signer = new JwtTokenSigner();
    const token = signer.sign({
      id: '11111111-2222-3333-4444-555555555555',
      email: 'test@example.com',
      username: 'testuser',
      role: 'admin'
    });

    expect(typeof token).toBe('string');

    const decoded: any = signer.verify(token);
    expect(decoded.sub).toBe('11111111-2222-3333-4444-555555555555');
    expect(decoded.email).toBe('test@example.com');
    expect(decoded.username).toBe('testuser');
    expect(decoded.role).toBe('admin');
  });
});

