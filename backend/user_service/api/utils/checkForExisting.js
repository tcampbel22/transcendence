//checks for existing user before user creation, avoid duplicates and unneccesary checks.

export async function checkForExistingUser(prisma, username) {
    return await prisma.user.findFirst(
        { 
            where: { username },
            select: {
                id: true
            }
        });
}
