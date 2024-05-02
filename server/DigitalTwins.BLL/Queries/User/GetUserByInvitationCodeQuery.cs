using AutoMapper;
using DigitalTwins.Common.DTOs.User;
using DigitalTwins.DAL.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DigitalTwins.BLL.Queries.User;

public class GetUserByInvitationCodeQuery : IRequest<UserDTO>
{
    public string InvitationCode { get; set; } = string.Empty;
}

public class GetUserByInvitationCodeQueryHandler : IRequestHandler<GetUserByInvitationCodeQuery, UserDTO>
{
    private readonly DigitalTwinContext _context;
    private readonly IMapper _mapper;

    public GetUserByInvitationCodeQueryHandler(DigitalTwinContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<UserDTO> Handle(GetUserByInvitationCodeQuery request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.AsNoTracking()
            .FirstOrDefaultAsync(x => x.InvitationCode == request.InvitationCode, cancellationToken)
            ?? throw new KeyNotFoundException("User not found");
        
        return _mapper.Map<UserDTO>(user);
    }
}