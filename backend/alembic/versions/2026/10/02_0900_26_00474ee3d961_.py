"""empty message

Revision ID: 00474ee3d961
Revises: 434ff45af670
Create Date: 2026-10-02 09:00:26.835970

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '00474ee3d961'
down_revision: Union[str, Sequence[str], None] = '434ff45af670'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
