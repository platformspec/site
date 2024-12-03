<script setup>
import { VPTeamMembers } from 'vitepress/theme';

const members = [
  {
    avatar: '../../authors/josh-west.jpg',
    name: 'Josh West',
    links: [
      { icon: 'github', link: 'https://github.com/codewest' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/josh-west/' }
    ]
  },
  {
    avatar: '../../authors/jens-saade.jpg',
    name: 'Jens Saade',
    links: [
        { icon: 'github', link: 'https://github.com/jenssaade' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/jenssaade/' }
    ]
  }
]
</script>

# Authors

## Corporate Sponsors

The Platform Specification has emerged from [FoundationIO](https://www.foundation.io), a company passionately focused entirely on cloud platform engineering leveraging the cloud-native ecosystem:

<p>&nbsp;</p>

[![FoundationIO](./fio_full_black_lockup_solid.png){style="display: block; margin: 0 auto" .light-only}](https://www.foundation.io)
[![FoundationIO](./fio_full_white_lockup_solid.png){style="display: block; margin: 0 auto" .dark-only}](https://www.foundation.io)

<p>&nbsp;</p>

## Authors and Contributors

<VPTeamMembers size="medium" :members="members" />
