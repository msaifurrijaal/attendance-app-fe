import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export const PageHeader = ({ title, breadcrumbs }: Props) => {
  return (
    <Stack direction="column" spacing="4px">
      <Typography variant="h3">{title}</Typography>
      <Breadcrumbs>
        {breadcrumbs.map((item, index) =>
          item.href ? (
            <Link
              key={index}
              href={item.href}
              underline="hover"
              color="text.secondary"
            >
              {item.label}
            </Link>
          ) : (
            <Typography key={index} color="text.primary">
              {item.label}
            </Typography>
          ),
        )}
      </Breadcrumbs>
    </Stack>
  );
};
