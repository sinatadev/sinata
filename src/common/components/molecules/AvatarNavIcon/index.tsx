import IconPopover from '@/common/components/molecules/IconPopover';
import { getPayloadData } from '@/common/utils/decryptToken';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Avatar, Box, Chip, Divider, Stack, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AvatarNavIcon() {
    const { push } = useRouter();
    const onLogout = () => {
        Cookies.remove('tkn');
        push('/sign-in');
    };
    const api_image = process.env.NEXT_PUBLIC_API_IMG;
    const user = getPayloadData();
    return (
        <>
            <IconPopover height='auto' alt='user-icon' icon={
                <>
                    <Avatar alt={user?.account.name} src={user ? `${api_image}/${user.account.img_profil}` : '/'} />
                    <Stack direction='row' alignItems='center' sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Typography variant='body2' className='ml-2 text-gray-600'>{user ? user.account.name : ''}</Typography>
                        <ExpandMoreIcon className='text-gray-500 text-base' />
                    </Stack>
                </>
            }>
                <Box className='xs:w-[85vw] md:w-52'>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography variant='body2' className='text-gray-600 font-medium'>Selamat Datang!</Typography>
                        <Chip label={user ? `${user!.account.role}` : ''} variant='filled' color='primary' sx={{ height: 14 }} className='text-[10px]' />
                    </Stack>
                    <Box className='mt-4'>
                        <Link href='/admins/profile'>
                            <Stack direction='row' alignItems='center' className='hover:text-primary text-gray-500 mb-2'>
                                <PersonOutlinedIcon className='text-[16px]' />
                                <Typography variant='body2' className='ml-2'>Profil Akun</Typography>
                            </Stack>
                        </Link>
                        <Link href=''>
                            <Stack direction='row' alignItems='center' className='hover:text-primary text-gray-500'>
                                <LockOutlinedIcon className='text-[16px]' />
                                <Typography variant='body2' className='ml-2'>Kunci Layar</Typography>
                            </Stack>
                        </Link>
                        <Divider light className='my-3' />
                        <Link href='' onClick={onLogout}>
                            <Stack direction='row' alignItems='center' className='hover:text-primary text-gray-500'>
                                <LogoutOutlinedIcon className='text-[16px]' />
                                <Typography variant='body2' className='ml-2'>Sign Out</Typography>
                            </Stack>
                        </Link>
                    </Box>
                </Box>
            </IconPopover>
        </>
    );
}