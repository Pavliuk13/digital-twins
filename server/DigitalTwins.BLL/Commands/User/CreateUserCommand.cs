using FluentValidation;
using MediatR;

namespace DigitalTwins.BLL.Commands.User;

public class CreateUserCommand : IRequest
{
    
}

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    
}

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand>
{
    public Task Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
